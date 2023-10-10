import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineMore } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import "./viewstorymobile.css";
import { getRequestedData } from "./functions/api/Api";

// import Videos from "./component/Video";

function App() {
  const [loading, setLoading] = useState(false);
  const [storyPageNo, setStoryPage] = useState(1);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const loadStoriesBasedOnCategoryHandler = async (categoryId) => {
      setLoading(true);
      const url = `https://sessionway.com/api/explore/getCategoryBasedFreeStories?category_id=${categoryId}&page=${storyPageNo}&storyType=video`;

      try {
        let res = await getRequestedData(url);

        setStoryPage(storyPageNo + 1);
        if (storyPageNo > 1) {
          setStories((oldArray) => [
            ...oldArray,
            ...res.data.body.getStoryModel,
          ]);

        } else {
          setStories(res.data.body.getStoryModel);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
        alert(err.message);
      }
    };
    loadStoriesBasedOnCategoryHandler("647e2a9b944ac81667b2cbfb");
  }, []);


  console.log("stories===>", stories)


  const toggleDescription = (id) => {
    var element = document.getElementById(id);
    element.classList.toggle("active");
  };



  function scrollHandler(e) {
    const scrollPosition = e.target.scrollTop;
    const cardHeight = window.innerHeight;
    const currentIndex = Math.floor(scrollPosition / cardHeight);

    console.log("currentIndex==>",currentIndex)

    stories.forEach((story, i) => {
      if (i !== currentIndex) {
        const videoElement = document.getElementById(`s${i + 1}`);
        if (videoElement) {
          videoElement.pause();
          console.log("status==> pause", i);
        }
      }
    });

    const currentVideoElement = document.getElementById(`s${currentIndex + 1}`);
    if (currentVideoElement) {
      currentVideoElement.play();
      console.log("status==> play", currentIndex);
    }
  }

  return (
    <div className="player-wrapper">
      {!loading && (
        <div className="video-card-wrapper" onScroll={scrollHandler}>
          {stories.length > 0 &&
            stories.map((story, i) => {
              if (story.story_type === "video") {
                return (
                  <div className="video-card" key={i + story._id}>
                    {story.story_url_quality_versions.url_360 && (
                      <video
                        src={story.story_url_quality_versions.url_720}
                        alt="reals video"
                        className="video-player"
                        loop
                        preload="metadata"
                        id={`s${i + 1}`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {!story.story_url_quality_versions.url_360 && (
                      <video
                        src={story.story_url}
                        alt="reals video"
                        className="video-player"
                        loop
                        preload="metadata"
                        id={`s${i + 1}`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {story._id && (
                      <div
                        className="thumbs-wrapper"
                        style={{ overflow: "hidden" }}
                      >
                        <div className="thumb-icons">
                          <div className="thumb-icons-flex">
                            <div className="thumb-icons-items  mt-2">
                              <BsChatLeftText size={25} />
                            </div>

                            <div className="thumb-icons-items  mt-2">
                              <HiOutlineLightBulb size={30} />
                            </div>

                            <div className="thumb-icons-items   mt-2">
                              <RiSendPlaneLine size={25} />
                            </div>

                            <div className="thumb-icons-items   mt-2">
                              <AiOutlineMore
                                size={30}
                                style={{ fontWeight: "600" }}
                                onClick={() => {
                                  toggleDescription(story._id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="thumb-parent">
                            <div className="image-thumb-wrapper">
                              <div>
                                <div className="display-flex">
                                  <img
                                    src={story.user_id.imageUrl}
                                    alt="imagename"
                                    className="image-thb"
                                    onError={(e) => {
                                      e.target.onError = null;
                                    }}
                                  />
                                  <div className="title-card">
                                    {" "}
                                    {story.story_title}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              {story.following && (
                                <button className="btn btn-sub">
                                  Subscribed
                                </button>
                              )}
                              {!story.following && (
                                <button className="btn btn-sub">
                                  Subscribe
                                </button>
                              )}
                            </div>
                          </div>
                          <div
                            className={`thumb-desc ${
                              story.story_language_id.code === "ar"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {parse(story.story_text)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import parse from "html-react-parser";
// import { HiOutlineLightBulb } from "react-icons/hi";
// import { AiOutlineMore } from "react-icons/ai";
// import { BsChatLeftText } from "react-icons/bs";
// import { RiSendPlaneLine } from "react-icons/ri";
// import "./viewstorymobile.css";
// import { getRequestedData } from "./functions/api/Api";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [storyPageNo, setStoryPage] = useState(1);
//   const [stories, setStories] = useState(1);

//   useEffect(() => {
//     const loadStoriesBasedOnCategoryHandler = async (categoryId) => {
//       setLoading(true);
//       const url = `https://sessionway.com/api/explore/getCategoryBasedFreeStories?category_id=${categoryId}&page=${storyPageNo}&storyType=video`;

//       try {
//         let res = await getRequestedData(url);

//         setStoryPage(storyPageNo + 1);
//         if (storyPageNo > 1) {
//           setStories((oldArray) => [
//             ...oldArray,
//             ...res.data.body.getStoryModel,
//           ]);
//         } else {
//           setStories(res.data.body.getStoryModel);
//         }
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         console.log(err.message);
//         alert(err.message);
//       }
//     };
//     loadStoriesBasedOnCategoryHandler("647e2a9b944ac81667b2cbfb");
//   }, []);

//   const toggleDescription = (id) => {
//     var element = document.getElementById(id);
//     element.classList.toggle("active");
//   };

//   let currentCheck = 0;
//   let index = 0;
//   let stoped = false;
//   function scrollHandler(e) {
//     var atSnappingPoint = e.target.scrollTop % e.target.offsetHeight === 0;
//     var timeOut = atSnappingPoint ? 0 : 150; //see notes

//     clearTimeout(e.target.scrollTimeout); //clear previous timeout

//     e.target.scrollTimeout = setTimeout(function () {
//       //using the timeOut to evaluate scrolling state
//       if (!timeOut) {
//         console.log("Scroller snapped!");

//         console.log(e.target.scrollTop, e.target.offsetHeight);

//         if (currentCheck <= e.target.scrollTop) {
//           currentCheck = e.target.scrollTop;

//           if (stoped) {
//             stoped = false;

//             if (document.getElementById(`s${index}`))
//               document.getElementById(`s${index}`).play();

//             if (document.getElementById(`s${index - 1}`))
//               document.getElementById(`s${index - 1}`).pause();
//             index = index;
//           } else {
//             if (document.getElementById(`s${index}`))
//               document.getElementById(`s${index}`).pause();
//             if (document.getElementById(`s${index + 1}`))
//               document.getElementById(`s${index + 1}`).play();
//             index = index + 1;
//           }
//         } else {
//           currentCheck = e.target.scrollTop;
//           if (stoped) {
//             stoped = false;
//             if (document.getElementById(`s${index}`))
//               document.getElementById(`s${index}`).play();
//             if (document.getElementById(`s${index + 1}`))
//               document.getElementById(`s${index + 1}`).pause();
//             index = index;
//           } else {
//             if (document.getElementById(`s${index}`))
//               document.getElementById(`s${index}`).pause();
//             if (document.getElementById(`s${index - 1}`))
//               document.getElementById(`s${index - 1}`).play();
//             index = index - 1;
//           }
//         }
//       } else {
//         console.log("User stopped scrolling.");
//         console.log(index);
//         stoped = true;
//       }
//     }, timeOut);

//     // if (e.target.scrollLeft % e.target.offsetWidth === 0) {
//     //   console.log("Scrolling is done!");
//     // }
//   }

//   return (
//     <div className="player-wrapper">
//       {!loading && (
//         <div className="video-card-wrapper" onScroll={scrollHandler}>
//           {stories.length > 0 &&
//             stories.map((story, i) => {
//               if (story.story_type === "video") {
//                 return (
//                   <div className="video-card" key={i + story._id}>
//                     {story.story_url_quality_versions.url_360 && (
//                       <video
//                         src={story.story_url_quality_versions.url_720}
//                         alt="reals video"
//                         className="video-player"
//                         loop
//                         preload="metadata"
//                         id={`s${i + 1}`}
//                       >
//                         Your browser does not support the video tag.
//                       </video>
//                     )}
//                     {!story.story_url_quality_versions.url_360 && (
//                       <video
//                         src={story.story_url}
//                         alt="reals video"
//                         className="video-player"
//                         loop
//                         preload="metadata"
//                         id={`s${i + 1}`}
//                       >
//                         Your browser does not support the video tag.
//                       </video>
//                     )}
//                     {story._id && (
//                       <div
//                         className="thumbs-wrapper"
//                         style={{ overflow: "hidden" }}
//                       >
//                         <div className="thumb-icons">
//                           <div className="thumb-icons-flex">
//                             <div className="thumb-icons-items  mt-2">
//                               <BsChatLeftText size={25} />
//                             </div>

//                             <div className="thumb-icons-items  mt-2">
//                               <HiOutlineLightBulb size={30} />
//                             </div>

//                             <div className="thumb-icons-items   mt-2">
//                               <RiSendPlaneLine size={25} />
//                             </div>

//                             <div className="thumb-icons-items   mt-2">
//                               <AiOutlineMore
//                                 size={30}
//                                 style={{ fontWeight: "600" }}
//                                 onClick={() => {
//                                   toggleDescription(story._id);
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="thumb-parent">
//                             <div className="image-thumb-wrapper">
//                               <div>
//                                 <div className="display-flex">
//                                   <img
//                                     src={story.user_id.imageUrl}
//                                     alt="imagename"
//                                     className="image-thb"
//                                     onError={(e) => {
//                                       e.target.onError = null;
//                                     }}
//                                   />
//                                   <div className="title-card">
//                                     {" "}
//                                     {story.story_title}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div>
//                               {story.following && (
//                                 <button className="btn btn-sub">
//                                   Subscribed
//                                 </button>
//                               )}
//                               {!story.following && (
//                                 <button className="btn btn-sub">
//                                   Subscribe
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                           <div
//                             className={`thumb-desc ${
//                               story.story_language_id.code === "ar"
//                                 ? "text-right"
//                                 : "text-left"
//                             }`}
//                           >
//                             {parse(story.story_text)}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               }
//             })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
