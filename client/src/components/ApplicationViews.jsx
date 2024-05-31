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
import UserProfileEdit from "./userprofiles/UserProileEdit.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
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
                <UserProfileEdit />
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
          <Route index element={<PostsList />} />
          <Route
            path=":id"
            element={<PostDetails loggedInUser={loggedInUser} />}
          />
          <Route path=":id/comments" element={<ViewComments />} />
          <Route path="create" element={<CreatePost />} />
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
      </Route>
      <Route path="/comments">
        <Route index element={<ViewComments loggedInUser={loggedInUser} />} />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
