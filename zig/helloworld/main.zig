const std = @import("std");

const Color = enum { red, blue, @"some green" };

pub fn main() !void {
    std.debug.print("this is debug: {any}\n", .{"variable"});

    const mc = Color.red;
    std.debug.print("enum value: {any}\n", .{mc});
    std.debug.print("enum value: {any}\n", .{Color.@"some green"});
}
