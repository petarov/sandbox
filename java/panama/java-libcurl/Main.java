import java.lang.invoke.*;
import java.foreign.*;
import java.foreign.memory.*;
import org.unix.curl.*;
import org.unix.curl_h;
import static org.unix.curl_h.*;
import static org.unix.easy_h.*;

public class Main {

   public static void main(String[] args) {
       try (Scope s = curl_h.scope().fork()) { 
           curl_global_init(CURL_GLOBAL_DEFAULT);
           Pointer<Void> curl = curl_easy_init();
           if(!curl.isNull()) {
               Pointer<Byte> url = s.allocateCString(args[0]);
               curl_easy_setopt(curl, CURLOPT_URL, url);
               //FILE *f = fopen("target.txt", "wb");
               //curl_easy_setopt(handle, CURLOPT_WRITEDATA, f);
               int res = curl_easy_perform(curl);
               if (res != CURLE_OK) {
                 System.err.println("Error fetching from: " + args[0] + " ERR: " + Pointer.toString(curl_easy_strerror(res)));
                 curl_easy_cleanup(curl);
               }
           }
           curl_global_cleanup();
       }
    }

}
