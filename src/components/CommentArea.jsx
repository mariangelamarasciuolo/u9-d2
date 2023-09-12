import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";

const CommentArea = (props) => {
  /* state = {
    comments: [],
    isLoading: false,
    isError: false,
    isFirstLoad: true
  }; */

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/books/" + props.asin + "/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5Y2NhMThkM2Q0OTAwMTRjZmQ3ZmEiLCJpYXQiOjE2OTQwOTI0NTAsImV4cCI6MTY5NTMwMjA1MH0.fgB8DJQ6GZCMZGZ7c_5mcKN-RG4yiVrx-xXRPLfBdG4",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
        setIsFirstLoad(false);
      } else {
        console.log("error");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  /*  componentDidMount() {
    console.log("componentDidMount()");
  } */
  useEffect(() => {
    console.log("componentDidMount()");
  }, []);

  /*  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
      console.log("siamo in componentDidUpdate e stiamo fetchando");
    } else {
      console.log("siamo in componentDidUpdate ma senza più fetch");
    }
  } */
  useEffect(() => {
    if (props.asin !== ``) {
      fetchComments();
      console.log("siamo in componentDidUpdate e stiamo fetchando");
    } else {
      console.log("siamo in componentDidUpdate ma senza più fetch");
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      <h2>CommentArea</h2>
      {isError && <Error />}
      <AddComment asin={props.asin} />
      {isLoading && <Loading />}

      {!isLoading && !isFirstLoad && comments.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>Non ci sono ancora commenti</ListGroup.Item>
        </ListGroup>
      ) : (
        <CommentList commentsToShow={comments} />
      )}
    </div>
  );
};

export default CommentArea;
