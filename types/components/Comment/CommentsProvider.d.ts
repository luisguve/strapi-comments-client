import React from "react";
export interface IAuthor {
    username: string;
    email: string;
    id: string;
}
export interface ISubcomment {
    id: string;
    from_admin: boolean;
    createdAt: string;
    content: string;
    author: IAuthor | null;
}
export interface IComment {
    id: string;
    from_admin: boolean;
    createdAt: string;
    content: string;
    author: IAuthor | null;
    subcomments?: ISubcomment[];
}
export interface ICommentsData {
    commentsCount: Number;
    comments: IComment[];
}
export interface IUser {
    id: string;
    token: string;
    username: string;
    email: string;
}
interface ICommentsContext {
    commentsCount: Number;
    comments: IComment[];
    collapseReplies: boolean;
    loadingComments: boolean;
    errorHelperMessage: string;
    setContentID: (contentID: string) => void;
    loadMore: () => Promise<void>;
    apiURL: string;
    postReply: (cID: string, content: string) => Promise<void>;
    user: IUser | null;
    setUser: (user: IUser) => void;
    postComment: (content: string) => Promise<void>;
}
declare const CommentsContext: React.Context<ICommentsContext>;
interface IProviderProps {
    collapseReplies?: boolean;
    children: React.ReactNode;
    contentID?: string;
    apiURL: string;
}
export declare const CommentsProvider: (props: IProviderProps) => JSX.Element;
export default CommentsContext;
