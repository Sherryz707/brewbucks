function ReviewCard() {
  const rating = Math.floor(Math.random() * (5 - 3 + 1) + 3);
  return (
    <article>
      <div className="flex items-center mb-4 space-x-4">
        <img
          className="w-10 h-10 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <div className="space-y-1 font-medium dark:text-white">
          <p>Jese Leos </p>
        </div>
      </div>
      <div className="flex items-center my-2.5 mb-1">
        <div className="rating  rating-sm md:rating-md lg:rating-md">
          {Array.from({ length: 5 }, (_, el) => (
            <input
              key={el}
              type="radio"
              name={`rating-${rating ?? 3}`}
              className="mask mask-star-2 bg-orange-400"
              defaultChecked={el === rating ? true : undefined}
            />
          ))}
        </div>
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed on <time datetime="2017-03-03 19:00">March 3, 2017</time>
        </p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
      </p>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        It is obviously not the same build quality as those very expensive
        watches. But that is like comparing a Citroën to a Ferrari. This watch
        was well under £100! An absolute bargain.
      </p>
      <div className="divider"></div>
    </article>
  );
}

export default ReviewCard;
