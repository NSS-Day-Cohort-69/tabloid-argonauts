import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import CategoryList from "./categories/Categories";
import CategoryEditForm from "./categories/CategoryEdit";
import { PostsList } from "./posts/PostsList";
import CategoryCreateForm from "./categories/CategoryCreateForm";
import { TagsList } from "./tags/TagsList";
import { CreateTagForm } from "./tags/CreateTagForm";
import { EditTagForm } from "./tags/EditTagForm";
import { PostDetails } from "./posts/PostDetails";
import MyPostList from "./posts/MyPostList";
import ViewComments from "./comments/ViewComments";
import CreatePost from "./posts/CreatePost.jsx";
import { ReactionList } from "./reactions/ReactionList.jsx";
import { CreateReactionForm } from "./reactions/CreateReactionForm.jsx";
import UserProfileEdit from "./userprofiles/UserProileEdit.jsx";
import EditComment from "./comments/editCommentForm.jsx";
import { UserPosts } from "./posts/UserPosts.jsx";
import AdminApproval from "./userprofiles/AdminApproval.jsx";
import { SubscribedPosts } from "./posts/SubscribedPosts.jsx";
import EditPost from "./posts/EditPost.jsx";
import { MyProfile } from "./userprofiles/MyProfile.jsx";
import { EditMyProfile } from "./userprofiles/EditMyProfile.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <SubscribedPosts loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id/edit"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileEdit loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="pending"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <AdminApproval loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/tags">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <TagsList />
              </AuthorizedRoute>
            }
          />
          <Route path="create" element={<CreateTagForm />} />
          <Route path=":id" element={<EditTagForm />} />
        </Route>
        <Route path="/categories">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CategoryList />
              </AuthorizedRoute>
            }
          />
          <Route
            path="/categories/edit/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CategoryEditForm />
              </AuthorizedRoute>
            }
          />
          <Route
            path="/categories/create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CategoryCreateForm />
              </AuthorizedRoute>
            }
          />
        </Route>

        <Route path="/posts">
          <Route index element={<PostsList loggedInUser={loggedInUser} />} />
          <Route
            path="create"
            element={<CreatePost loggedInUser={loggedInUser} />}
          />
          <Route path=":id">
            <Route
              index
              element={<PostDetails loggedInUser={loggedInUser} />}
            />
            <Route path="comments">
              <Route
                index
                element={<ViewComments loggedInUser={loggedInUser} />}
              />
              <Route path="edit/:commentId" element={<EditComment />} />
            </Route>
          </Route>
        </Route>

        <Route
          path="/posts/:userId/:userName"
          element={<UserPosts loggedInUser={loggedInUser} />}
        />

        <Route path="/reactions">
          <Route index element={<ReactionList />}></Route>
          <Route path="create" element={<CreateReactionForm />} />
        </Route>

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="/myposts">
        <Route index element={<MyPostList loggedInUser={loggedInUser} />} />
        <Route
          path="edit/:postId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditPost />
            </AuthorizedRoute>
          }
        />
      </Route>
      {/* <Route path="/comments">
        <Route index element={<ViewComments loggedInUser={loggedInUser} />} />
        <Route path=":postId/edit/:commentId" element={<EditComment />} />
      </Route> */}
      <Route path="/profile">
        <Route index element={<MyProfile loggedInUser={loggedInUser} />} />
        <Route path="edit/:userId" element={<EditMyProfile />} />
      </Route>

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
