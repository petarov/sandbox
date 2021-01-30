#include "_cgo_export.h"
#import "app_darwin.h"

#pragma mark - functions

void* SharedApplication(void) {
	return [NSApplication sharedApplication];
}

int Run(void *appPtr) {
    @autoreleasepool {
        /**
         * Key-related events may only be monitored if accessibility is enabled or if your application is trusted for accessibility access.
         * See - https://developer.apple.com/documentation/appkit/nsevent/1535472-addglobalmonitorforeventsmatchin
         */
        if (AXIsProcessTrustedWithOptions((__bridge CFDictionaryRef)@{(__bridge NSString *)kAXTrustedCheckOptionPrompt: @true})) {
            [NSEvent addGlobalMonitorForEventsMatchingMask:NSEventMaskKeyDown
                                                handler:^(NSEvent *_Nonnull event){
                if (event.type == NSEventTypeKeyDown) {
                    OnKeyDown(event.keyCode);
                }
            }];

            NSApplication* app = (NSApplication *)appPtr;
            AppDelegate *appDelegate = [[AppDelegate alloc] init];
            [app setDelegate:appDelegate];

            // See - https://developer.apple.com/documentation/appkit/nsapplicationactivationpolicy/nsapplicationactivationpolicyprohibited
            [app setActivationPolicy:NSApplicationActivationPolicyProhibited];
            [app run];

            return EXIT_SUCCESS;
        }
	}

    return -1;
}

#pragma mark - AppDelegate

@interface AppDelegate ()
@property (strong, nonatomic) dispatch_source_t sigIntHandler;
@property (strong, nonatomic) dispatch_source_t sigTermHandler;
@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    dispatch_block_t block;
    block = ^{
        NSLog(@"Caught SIGINT");
        OnAppTerminated();
        [[NSApplication sharedApplication] terminate:self];
    };

    self.sigIntHandler = dispatch_source_create(DISPATCH_SOURCE_TYPE_SIGNAL, SIGINT, 0, dispatch_get_main_queue());
    self.sigTermHandler = dispatch_source_create(DISPATCH_SOURCE_TYPE_SIGNAL, SIGTERM, 0, dispatch_get_main_queue());
    dispatch_source_set_event_handler(self.sigIntHandler, block);
    dispatch_source_set_event_handler(self.sigTermHandler, block);
    dispatch_resume(self.sigIntHandler);
    dispatch_resume(self.sigTermHandler);

    // prevent sudden death
    signal(SIGINT, dieSignalHandler);
    signal(SIGTERM, dieSignalHandler);

    OnAppStarted();
}

void dieSignalHandler(int signal)
{
    // do nothing
}

@end