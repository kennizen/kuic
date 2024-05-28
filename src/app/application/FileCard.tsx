import { formatBytes } from "@/utils/funtions";
import { useRtcCtx } from "./page";

interface IProps {
  idx: number;
  name: string;
  type: string;
  size: number;
  handleRequestToSendFile?: (idx: number) => void;
}

const FileCard = ({ name, size, type, idx, handleRequestToSendFile }: IProps) => {
  // hooks
  const { handleDeleteFile } = useRtcCtx();

  return (
    <div className="flex items-center p-3 pr-2 bg-slate-800 w-full rounded-md gap-3 justify-between">
      <div className="overflow-hidden">
        <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={name}>
          {name}
        </p>
        <div className="flex items-center gap-2">
          {type !== "" && <p className="text-xs text-slate-400">{type},</p>}
          <p className="text-xs text-slate-400">{formatBytes(size)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[20px] w-[2px] bg-slate-400"></div>
        <div className="flex items-center">
          <button
            onClick={() => handleDeleteFile(idx)}
            className="hover:bg-slate-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors active:bg-slate-700"
          >
            <i className="ri-delete-bin-6-line"></i>
          </button>
          <button
            onClick={() => handleRequestToSendFile?.(idx)}
            className="hover:bg-slate-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors active:bg-slate-700"
          >
            <i className="ri-send-plane-line"></i>
            {/* <i className="ri-loader-4-line"></i> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
