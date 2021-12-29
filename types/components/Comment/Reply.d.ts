/// <reference types="react" />
import { ISubcomment } from "./CommentsProvider";
interface IReplyProps {
    data: ISubcomment;
}
declare const Reply: ({ data }: IReplyProps) => JSX.Element;
export default Reply;
