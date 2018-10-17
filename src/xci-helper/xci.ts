import { createReadStream } from 'fs';
import { Int64, Int64LE } from 'int64-buffer';

/**
 *  Offset map for XCI files.
 *  - Header - should be a hex string that contains "HEAD" word inside. We use this to check for a valid XCI file.
 *  - Card size - a single byte number - an index - which represents the Card Size.
 *  Index to card-size mapping in indexToCartridgeSize();
 *  - Used bytes - Int64 at offset representing the exact used number of bytes.
 *  TODO: Write partition docs.
 */
const BYTE_OFFSET_MAP = {
    HEADER_START_OFFSET: 256,
    HEADER_END_OFFSET: 300,
    CARD_SIZE_START_OFFSET: 269,
    CARD_SIZE_END_OFFSET: 270,
    USED_BYTES_INT64_OFFSET: 280,
    PARTITION_OFFSET_INT64_OFFSET: 304,
    PARTITION_SIZE_INT64_OFFSET: 312
};

export class XCI {
    private xciData: Buffer;
    public readonly fileName: string;
    public readonly header: string;
    public readonly cardSizeIndex: number;
    public readonly humanReadableSize: string;
    public readonly usedSize: string;
    public readonly hfs0OffsetPartition: Int64;
    public readonly hfs0SizePartition: Int64;

    private constructor(fileName: string, fileBuffer: Buffer) {
        this.xciData = fileBuffer;
        this.fileName = fileName;
        this.header = this.xciData.toString(
            'utf8',
            BYTE_OFFSET_MAP.HEADER_START_OFFSET,
            BYTE_OFFSET_MAP.HEADER_END_OFFSET
        );
        const cardSize = this.xciData.toString(
            'hex',
            BYTE_OFFSET_MAP.CARD_SIZE_START_OFFSET,
            BYTE_OFFSET_MAP.CARD_SIZE_END_OFFSET
        );
        this.cardSizeIndex = parseInt(cardSize, 16);
        this.humanReadableSize = this.indexToCartridgeSize(this.cardSizeIndex);
        const usedBytesIndex = new Int64LE(this.xciData, BYTE_OFFSET_MAP.USED_BYTES_INT64_OFFSET);
        const usedBytes = usedBytesIndex.toNumber() * 512 + 512;
        this.usedSize = this.humanReadableBytes(usedBytes);
        this.hfs0OffsetPartition = new Int64LE(this.xciData, BYTE_OFFSET_MAP.PARTITION_OFFSET_INT64_OFFSET);
        this.hfs0SizePartition = new Int64LE(this.xciData, BYTE_OFFSET_MAP.PARTITION_SIZE_INT64_OFFSET);
    }

    /**
     *  Receives a size index taken from the 269th byte of the .xci file
     *  and maps it to a human-readable size string.
     * @param {number} index
     * @returns {string}
     */
    private indexToCartridgeSize(index: number): string {
        switch (index) {
            case 248:
                return "2GB";
            case 240:
                return "4GB";
            case 224:
                return "8GB";
            case 225:
                return "16GB";
            case 226:
                return "32GB";
            default:
                return "?";
        }
    }

    /**
     *  Takes a bytes number and returns a formatted size string.
     * @param {number} x
     * @returns {string}
     */
    private humanReadableBytes(x: number): string {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0;
        let bytes = x;
        // tslint:disable-next-line
        while(bytes >= 1024 && ++l) {
            bytes = bytes/1024;
        }
        return(bytes.toFixed(bytes >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
    }

    /**
     * Takes a filename or a buffer as a param - reads in the XCI header range
     * and returns true if it finds a `HEAD` within it.
     *
     * @param {string | Buffer} fileName
     * @returns {boolean}
     *
     */
    public static verifyXCI(fileName: string | Buffer): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const fileStream = createReadStream(fileName, {
                start: 256,
                end: 260 // XCI Header range.
            });

            fileStream.on('data', (data: Buffer) => {

                // If the data range contains HEAD - we should be good.
                const HEADER_START = 'HEAD';
                const containsMagicWord = data.indexOf(HEADER_START) > -1;
                if ( containsMagicWord ) {
                    resolve(true);
                }
                fileStream.close();
                resolve(false);
            });
        });
    }

    public static createXCI(fileName: string,
                            onSuccess: (xci: XCI) => void,
                            onError: (errorMsg: string) => void) {


        /**
         * Check if filename / buffer is good
         * Verify the magic header word appears
         * read in the parameters
         * -> if it's all good -> return success
         * -> otherwise return error
         */
        const fileStream = createReadStream(fileName, {
            start: 0,
            end: 61440
        });

        fileStream.on('data', (data: Buffer) => {
            const xci = new XCI(fileName, data);
            onSuccess(xci);
        });
    }
}
