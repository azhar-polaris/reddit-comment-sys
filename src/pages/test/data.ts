export type CommentType = {
    id: number | string;
    value: string;
    comments: CommentType[];
}

export type DataType = {
    post: {
        title: string;
        desc: string;
        comments: CommentType[];
    }
}


export const data: DataType = {
    post: {
        title: "Simplified Reddit Comment system",
        desc: "This is a simplied reddit comment system, where one post can have n comments and each comment can have m comments",
        comments: [
            // {
            //     id: 1, 
            //     value: "First Comment",
            //     comments: [
            //         {
            //             id: 1,
            //             value: "First's Fist Inner comment",
            //             comments: []
            //         }
            //     ]
            // },
            // {
            //     id: 2, 
            //     value: "2nd Comment",
            //     comments: [
            //         {
            //             id: 1,
            //             value: "Second's Fist Inner comment",
            //             comments: []
            //         },
            //         {
            //             id: 2,
            //             value: "Second's 2nd Inner comment",
            //             comments: [
            //                 {
            //                     id: 1,
            //                     value: `Lorem Ipsum test 1 test 0`,
            //                     comments: []
            //                 },
            //                 {
            //                     id: 2,
            //                     value: `Lorem Ipsum test 1 test 1`,
            //                     comments: []
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ]
    }
}