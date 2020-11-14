(function(self) {

    var targetScore = 0;
    var scores = {};
    var sounds = {};

    function updateScore(json) {
        console.log('scores', scores)
        var total = 0;
        for (var k in scores) {
            total += scores[k];
        }
        document.querySelector('#score').textContent = '' + total + ' / ' + targetScore;

        if (total == targetScore) {
            var el = document.querySelector('#win');
            el.style.display = 'block';
            sounds.win.play();
        }
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function getSelect(json, id) {
        let opts = '';
        for (let item of json.pos) {
            if (item.id == id) {
                targetScore += 100;
                opts += '<option>...</option>';
                shuffleArray(item.pool);
                for (let p of item.pool) {
                    opts += '<option>' + p + '</option>';
                }
                break;
            }
        }
        return '<select class="sel" data-id="' + id + '">' + opts + '</select>';
    }

    function addText(json) {
        var el = document.querySelector('#text');
        var out = json.out;
        
        out = out.replace(/\n/g, '<br>');

        out = out.replace(/\<pos\-(\d+)\>/g, function(a, b){
            return getSelect(json, b);
        });

        el.innerHTML = out;

        var selects = document.querySelectorAll('select.sel');
        
        for (let i = 0; i < selects.length; i++) {
            selects[i].addEventListener("change", function(e) {
                var el = e.target;
                var selection = el.options[el.selectedIndex].text;
                var id = el.dataset.id;

                if (selection === '...') {
                    scores[id] = 0;
                }
                
                for (let item of json.pos) {
                    if (item.id == id) {
                        if (item.pos == selection) {
                            scores[id] = 100;
                            sounds.yes.play();
                        } else {
                            scores[id] = -100;
                            sounds.no.play();
                        }
                        break;
                    }
                }
                updateScore(json);
            });
        }
    }

    self.initApp = function() {
        fetch("alice.json")
            .then(response => response.json())
            .then(json => addText(json));

        sounds.no = new Howl({
            src: ['smb_bump.wav']
        });
        sounds.yes = new Howl({
            src: ['smb_coin.wav']
        });
        sounds.win = new Howl({
            src: ['smb_stage_clear.wav']
        });
    }
    

})(window);