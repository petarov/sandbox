"use strict";
const testPairs = [
    ["5M3HPmBsh0SbNM61wk8yhw==", "e4cdc73e-606c-8744-9b34-ceb5c24f3287"],
    ["TSHX64TMpUe0LxqVJ8Z+2w==", "4d21d7eb-84cc-a547-b42f-1a9527c67edb"],
    ["/fKTMip56kKvF9C+tAnrTg==", "fdf29332-2a79-ea42-af17-d0beb409eb4e"],
];
function decodeBase64ToBinary(base64String) {
    // Decode the Base64 string into a binary string
    const binaryString = atob(base64String);
    // Convert the binary string into a Uint8Array
    const binaryData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
    }
    return binaryData;
}
// function objectGUIDToUUID(objectGUID: Uint8Array) {
//     const hexValue = Buffer.from(objectGUID, 'binary').toString('hex');
//     return hexValue.replace(
//         //   (   $1:A4   )(   $2:A3   )(   $3:A2   )(   $4:A1   )(   $5:B2   )(   $6:B1   )(   $7:C2   )(   $8:C1   )(   $9:D    )(   $10:F    )
//         /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{4})([0-9a-f]{10})/,
//         '$4$3$2$1-$6$5-$8$7-$9-$10',
//     );
// }
function objectGUIDToUUID(objectGUID) {
    const dashPos = [4, 6, 8, 10];
    let guid = "";
    for (let i = 0; i < objectGUID.length; i++) {
        if (dashPos.includes(i)) {
            guid += "-";
        }
        guid += objectGUID[i].toString(16).padStart(2, "0");
    }
    return guid;
}
for (let i = 0; i < testPairs.length; i++) {
    const pair = testPairs[i];
    console.log(`Value: ${pair[1]}  Expected: ${objectGUIDToUUID(decodeBase64ToBinary(pair[0]))}`);
}
