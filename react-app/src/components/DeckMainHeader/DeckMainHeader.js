import "./DeckMainHeader.css";
import logo from "../../images/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import * as categoryActions from "../../store/categories";
import * as deckActions from "../../store/decks";

const DeckMainHeader = () => {
  const cards = useSelector((state) => state.cards);
  const category = useSelector((state) => state.categories.category);
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (deckId) {
      dispatch(categoryActions.getCategory(deckId));
    }
  }, [cards, deckId, dispatch]);

  const deleteUserDeck = (deleteId, userId) => {
    dispatch(deckActions.removeDeck({ deckId: deleteId, userId }));
    history.push("/decks-page");
  };

  return (
    <div id="deck-main-header-div">
      <div id="language-logo-div">
        <img src={logo} alt="language-logo"></img>
      </div>
      <div id="language-name-div">
        <h1>{category?.name ? category.name : "Select a deck"}</h1>
      </div>
      <div id="study-deck-button-div">
        {cards.length ? (
          <Link to={`/study-deck-page/${deckId}`}>
            <button className="nav-button study-button">Study Deck</button>
          </Link>
        ) : null}
      </div>
      <div id="delete-deck-button-div">
        {cards.length && sessionUser ? (<button
          className="nav-button delete-button"
          onClick={() => deleteUserDeck(deckId, sessionUser.id)}
        >
          Delete Deck
        </button>) : null}
      </div>
    </div>
  );
};

export default DeckMainHeader;
