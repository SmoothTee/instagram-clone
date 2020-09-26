import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Profile.module.css";
import { Layout } from "../../components/Layout";
import { readProfileAction } from "../../redux/user/actions";
import { useTypedSelector } from "../../redux/hooks";
import { Button } from "../../components/Button";
import { Tab } from "../../components/Tab";
import { TabItem } from "../../components/Tab/components/TabItem";
import { BsBookmark, BsGrid3X3 } from "react-icons/bs";
import { PostQuadrat } from "../../components/PostQuadrat/PostQuadrat";

export const Profile = () => {
  const dispatch = useDispatch();

  const { username } = useParams<{ username: string }>();

  const { users } = useTypedSelector((state) => state.entities);
  const profileByUsername = useTypedSelector(
    (state) => state.profileByUsername
  );
  const postsByUsername = useTypedSelector((state) => state.postsByUsername);

  useEffect(() => {
    dispatch(readProfileAction(username));
  }, []);

  const profile = profileByUsername[username];

  if (!profileByUsername[username] || profile.isFetching || !profile.item) {
    return <span>Loading</span>;
  } else {
    const user = users.byId[profile.item];
    const avatarUrl = user.avatar_url
      ? user.avatar_url
      : "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy";
    const postIds = postsByUsername[username].items;

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.details}>
              <img className={styles.avatar} src={avatarUrl} alt="avatar" />
              <div className={styles.header}>
                <span className={styles.username}>{user.username}</span>
                <Button>Follow</Button>
              </div>
              <div className={styles.numbers}>
                <span className={styles.fact}>
                  <b>{user.num_of_posts}</b> post
                  {user.num_of_posts === 1 ? "" : "s"}
                </span>
                <span className={styles.fact}>
                  <b>{user.num_of_followers}</b> follower
                  {user.num_of_followers === 1 ? "" : "s"}
                </span>
                <span className={styles.fact}>
                  <b>{user.num_of_followings}</b> following
                </span>
              </div>
              <span className={styles.full_name}>{user.full_name}</span>
            </div>
            <Tab>
              <TabItem path={`/profile/${username}`}>
                <BsGrid3X3 />
                <span>Posts</span>
              </TabItem>
              <TabItem path={`/profile/${username}/saved`}>
                <BsBookmark />
                <span>Saved</span>
              </TabItem>
            </Tab>
            <div className={styles.post_grid}>
              {postIds.map((pId) => (
                <PostQuadrat key={pId} postId={pId} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
