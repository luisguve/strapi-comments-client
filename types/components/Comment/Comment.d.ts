/// <reference types="react" />
import { IComment } from "./CommentsProvider";
export interface ICommentProps {
    data: IComment;
}
declare const Comment: ({ data }: ICommentProps) => JSX.Element;
export default Comment;
export interface FormReplyProps {
    commentID: string;
    closeForm: () => void;
}
