
const Home = () =>{
    return(
        <div className="post-list">
            <div className="post-wrapper">
                <div className="post-header">
                    <div className="post-avatar">
                        <img src="https://cdn-icons.flaticon.com/svg/3917/3917711.svg?token=exp=1676488238~hmac=ba91e3b640af3da412a62338f164c78c" alt="user-profile-pic"></img>

                        <div>
                            <span className="post-author">Karan kr</span>
                            <span className="post-time"> a minute ago</span>
                        </div>
                    </div>

                    <div className="post-content">
                        Post Content
                    </div>

                    <div className="post-action">
                        <div className="post-like">
                            <img src="https://cdn-icons.flaticon.com/svg/3916/3916586.svg?token=exp=1676488484~hmac=6beabc55b4c26bab89eabf51a2775c2e" alt="like-icon"></img>
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default Home;