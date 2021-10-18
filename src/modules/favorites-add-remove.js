import * as Favs from './favorites-show-hide.js';

const favoriteAddRemoveSwitch = {
  messages: {
    add: 'Add to Favorites',
    remove: 'Remove from Favorites'
  }
}

const activatePreviousSessionFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  if (favorites) {
    favorites.forEach(id => {
      const article = document.querySelector(`[data-content*="${id}"]`);
      if (article) {
        const btn = article.querySelector('.add-to-favorites');
        const message = 'Remove from favorites';
        article.classList.add('favorite');
        btn.setAttribute('aria-checked', "true");
        btn.title = message;
      }
    });
  }
}

const addStoredFavorite = uuid => {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  if (favorites) {
    if (favorites.includes(uuid)) {
      return;
    }
    favorites.push(uuid);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    localStorage.setItem('favorites', JSON.stringify([uuid]));
  }
};

const removeStoredFavorite = uuid => {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  if (favorites) {
    const index = favorites.indexOf(uuid);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
};

const checkIfLastFavoriteRemoved = () => {
  const isShowingFavorites = document.documentElement.classList.contains('show-favorites');

  if (isShowingFavorites) {
    if (Favs.getFavsCount() < 1) {
      document.documentElement.classList.remove('show-favorites');
      Favs.showAllArticles();
      Favs.toggleButtonValues(isShowingFavorites);
    }
  }
}

const showFavoriteArticlesOnly = () => {
  if (document.documentElement.classList.contains('show-favorites')) {
    const articles = document.querySelectorAll('article');

    if (articles.length >= 1) {
      articles.forEach(article => {
        if (!article.classList.contains('favorite')) {
          article.style.display = 'none';
        }
      });
    }
  }
}

const addRemoveFavorite = btn => {
  const article = btn.closest('article');
  const json = article.dataset.content;
  const data = JSON.parse(json);
  const uuid = data.uuid;
  const type = data.type;

  if (btn, uuid, type) {
    const isFavorite = article.classList.contains('favorite');
    article.classList.toggle('favorite');
    btn.ariaChecked = !isFavorite;
    btn.title = isFavorite ? favoriteAddRemoveSwitch.messages.add : favoriteAddRemoveSwitch.messages.remove;

    // Update localStorage
    isFavorite ? removeStoredFavorite(uuid) : addStoredFavorite(uuid);

    showFavoriteArticlesOnly();
    checkIfLastFavoriteRemoved();
  }
}

export const init = () => {
  const addToBtns = document.querySelectorAll('.add-to-favorites');

  if (addToBtns.length) {
    activatePreviousSessionFavorites();

    document.addEventListener('click', evt => {
      if (evt.target.closest('.add-to-favorites')) {
        const btn = evt.target.closest('.add-to-favorites');
        addRemoveFavorite(btn);
      }
    });
  }
};
