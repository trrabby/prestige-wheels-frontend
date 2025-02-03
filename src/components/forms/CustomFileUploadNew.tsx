import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Upload, Button } from "antd";
import { Controller } from "react-hook-form";
import type { UploadFile } from "antd";

type TCustomFileInputProps = {
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?: UploadFile[];
};

type FileType = UploadFile;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as Blob);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CustomFileUploadNew = ({
  label,
  name,
  disabled,
  defaultValue,
}: TCustomFileInputProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setFileList(defaultValue);
    }
  }, [defaultValue]);

  //   console.log(fileList);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} disabled={disabled}>
      Upload
    </Button>
  );

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : null}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => {
              setFileList(newFileList);
              onChange(newFileList);
            }}
            disabled={disabled}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomFileUploadNew;
