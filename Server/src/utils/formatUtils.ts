
export const mapMimeTypeToReadableName = (mimeType: any) => {
    switch (mimeType) {
        case "application/vnd.google-apps.folder":
            return "folder";
        case "application/json":
            return "json";
        case "application/pdf":
            return "pdf";
        case "text/x-sql":
            return "sql";
        case "application/x-bzip":
            return "BZip";
        case "application/x-bzip2":
            return "BZip2";
        case "text/css":
            return "css";
        case "text/csv":
            return "csv";
        case "application/msword":
            return "doc";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
        case "application/gzip":
            return "GZip";
        case "image/gif":
            return "gif";
        case "text/html":
            return "html";
        case "application/java-archive":
            return "jar";
        case "image/jpeg":
            return "jpeg";
        case "text/javascript":
            return "js";
        case "audio/mpeg":
            return "mp3";
        case "video/mp4":
            return "mp4";
        case "application/vnd.ms-powerpoint":
            return "ppt";
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "pptx";
        case "image/svg+xml":
            return "svg";
        case "application/vnd.ms-excel":
            return "xls";
        case "application/xml" || "text/xml":
            return "xml";
        default:
            return mimeType;
    }
}


export const formatBytes = (bytes: string) => {
    const num = parseInt(bytes);

    if (num === 0) {
        return "0 bytes";
    }

    const sizes = ["bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(num) / Math.log(1024));

    return parseFloat((num / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}