import { useState } from "react"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CommentType, data } from "./data"

type UserCommentType = {
    [key: string]: {
        value: string;
    }
}

const Reddit = () => {

    const [redditData, setRedditData] = useState<CommentType[]>(data.post.comments);
    const [userComment, setUserComment] = useState<UserCommentType>({});

    const addComment = (allComment: CommentType[], levels: number[], strLevel: string) => {
        if(levels.length === 0){
            const comment = userComment[strLevel];
            if(!comment) return;
            allComment.push({ id: "Random-id", value: comment.value, comments: [] })
            return;
        }
        return addComment(allComment[levels[0]].comments, levels.slice(1, ), strLevel)
    }

    const handleAddComment = (level: string) => {
        const levelArr = level.split("-").filter(Boolean).map(item => Number(item));
        setRedditData(prevData => {
            const clonedData = structuredClone(prevData);
            addComment(clonedData, levelArr, level);
            return clonedData;
        })
        setUserComment(prevData => {
            const allComments = { ...prevData };
            delete allComments[level];
            return allComments;
        })
    }

    const handleChangeUserInput = (e: React.ChangeEvent<HTMLInputElement>, level: string) => {
        setUserComment(prevData => ({
            ...prevData, [level]: { value: e.target.value }
        }))
    }

    const getComments = (comment: CommentType, level: string) => { 
        return (
            <div className="ml-4 drop-shadow-lg border border-[gray] border-b-0 max-w-screen">
                <p className="flex-1 my-3">{comment.value}</p>
                <div className="flex">
                    <Input 
                        type="text" 
                        placeholder="Reply" 
                        value={userComment[level]?.value || ""}
                        onChange={(e) => handleChangeUserInput(e, level)} 
                    />
                    <Button 
                        variant="ghost" 
                        onClick={() => handleAddComment(level)}
                    >
                        Reply
                    </Button>
                </div>
                {comment.comments.map((innerComment, index) => (
                    <div key={`${innerComment.value}_${index}`}>
                        {getComments(innerComment, `${level}-${index}`)}
                    </div>
                ))}
            </div>
        )
    }

    const handleChangeMainCommentInput = (e: React.ChangeEvent<HTMLInputElement>, ) => {
        setUserComment(prevData => {
            const mainKey = `mk-${redditData.length - 1}`
            return { ...prevData,  [mainKey]: { value: e.target.value} }
        })
    }

    const handleAddMainComment = () => {
        setRedditData(prevData => {
            const clonedData =  [...prevData];
            const mainComment = userComment[`mk-${redditData.length - 1}`];
            clonedData.push({
                id: "Random-id", value: mainComment.value, comments: [] 
            })
            return clonedData;
        })
        setUserComment(prevData => {
            const allComments = { ...prevData };
            delete allComments[`mk-${redditData.length - 1}`];
            return allComments;
        })
    }

    return (
        <div className="drop-shadow-lg border border-[gray] border-b-0 mt-[40px] ml-5 p-3">
            <div className="w-[300px] text-wrap mb-6 ">
                <h1 className="mb-2">{data.post.title}</h1>
                <h2>{data.post.desc}</h2>
            </div>
            <h3 className="mb-4">All Comments: </h3>

            <div className="flex mb-4">
                <Input 
                    type="text" 
                    value={userComment[`mk-${redditData.length - 1}`]?.value || ""} 
                    onChange={handleChangeMainCommentInput} 
                />

                <Button 
                    variant="ghost" 
                    onClick={() => handleAddMainComment()}
                >
                    Reply
                </Button>
            </div>


            {redditData.map((innerComment, index) => (
                <div key={`${innerComment.value}_${index}`}>
                    {getComments(innerComment, `${index}`)}
                </div>
            ))}

            {
                redditData.length === 0 && <h4 className="text-[red]">No Comments Yet</h4>
            }
        </div>
    )
}

export default Reddit