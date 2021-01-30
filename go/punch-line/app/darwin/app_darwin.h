#import <Cocoa/Cocoa.h>

void* SharedApplication(void);

int Run(void *appPtr);

@interface AppDelegate : NSObject <NSApplicationDelegate>

@end