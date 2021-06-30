import createUpload from "@ev-fns/upload";
import path from "path";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const upload = createUpload({
  field: "anexo",
  storageType: "disk",
  fileSize: MAX_FILE_SIZE,
  storagePath: path.join(__dirname, "..", "..", "storage"),
  mimetypes: ["image/jpg", "image/jpeg", "image/png"],
});
