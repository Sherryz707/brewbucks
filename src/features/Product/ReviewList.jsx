import ReviewCard from "./ReviewCard";

function ReviewList({reviews}) {
    return (
        <article className="max-w-[56rem] mt-20 px-5">
            {Array.from({length:5},(_,index) => (
                <ReviewCard key={index} />
            ))}
        </article>
    )
}

export default ReviewList
