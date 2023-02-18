
const Home = () =>{
    return(
        <div className="post-list">
            <div className="post-wrapper">
                <div className="post-header">
                    <div className="post-avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user-profile-pic"></img>

                        <div className="author-details">
                            <span className="post-author">Karan kr</span>
                            <span className="post-time"> a minute ago</span>
                        </div>
                    </div>

                    <div className="post-content">
                        Post Content
                    </div>

                    <div className="post-action">
                        <div className="post-like">
                            <img src="https://cdn-icons-png.flaticon.com/512/535/535234.png" alt="like-icon"></img>
                            <span>5</span>
                        </div>

                        <div className="post-comment-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/13/13673.png" alt="comments-icon"></img>
                            <span>3</span>
                        </div>
                    </div>

                    <div className="post-comment-box">
                        <input placeholder="start typing comment" />
                    </div>

                    <div className="post-comments-list">
                        <div className="post-comments-item">
                            <div className="post-comment-header">
                                <span className="post-commment-author">Karan</span>
                                <span className="post-comment-time">a minute ago</span>
                                <span className="post-comments-like">23</span>
                            </div>

                            <div className="post-comment-content">Random comment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default Home;