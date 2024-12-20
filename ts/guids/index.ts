const testPairs = [
    ["5M3HPmBsh0SbNM61wk8yhw==", "e4cdc73e-606c-8744-9b34-ceb5c24f3287"],
    ["TSHX64TMpUe0LxqVJ8Z+2w==", "4d21d7eb-84cc-a547-b42f-1a9527c67edb"],
    ["/fKTMip56kKvF9C+tAnrTg==", "fdf29332-2a79-ea42-af17-d0beb409eb4e"],
];

const testPairs2 = [
    ["5M3HPmBsh0SbNM61wk8yhw==", "3ec7cde4-6c60-4487-9b34-ceb5c24f3287"],
    ["TSHX64TMpUe0LxqVJ8Z+2w==", "ebd7214d-cc84-47a5-b42f-1a9527c67edb"],
    ["/fKTMip56kKvF9C+tAnrTg==", "3293f2fd-792a-42ea-af17-d0beb409eb4e"],
];

function decodeBase64ToBinary(base64String: string): Uint8Array {
    const binaryString = atob(base64String);
    const binaryData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
    }
    return binaryData;
}

function objectGUIDToUUID(objectGUID: Uint8Array, bigEndian = false): string {
    const dashPos = [4, 6, 8, 10];
    let guid = "";

    const objectGUIDOrdered = bigEndian ? [
        ...Array.from(objectGUID.slice(0, 4).reverse()),
        ...Array.from(objectGUID.slice(4, 6).reverse()),
        ...Array.from(objectGUID.slice(6, 8).reverse()),
        ...Array.from(objectGUID.slice(8, 16)),
    ] : objectGUID;

    for (let i = 0; i < objectGUIDOrdered.length; i++) {
        if (dashPos.includes(i)) {
            guid += "-";
        }

        guid += objectGUIDOrdered[i].toString(16).padStart(2, "0");
    }

    return guid;
}

for (let i = 0; i < testPairs2.length; i++) {
    const pair = testPairs2[i];
    console.log(`Value: ${objectGUIDToUUID(decodeBase64ToBinary(pair[0]), true)}  Expected: ${pair[1]}`)
}

