const favoritesSwitch = {
  switch: document.querySelector('.toggle-favorites'),
  articles: document.querySelectorAll('article'),
  messages: {
    showOnlyFavs: 'Show only Favorite projects',
    showAll: 'Show all projects',
    dialogUnsupported: 'The `<dialog>` API is not supported by this browser.',
    dialogContent: `<h3>No Favorites Selected</h3><p>You don&rsquo;t have any Favorited projects. Add some!</p><form method='dialog'><button class='x' title='Close dialog'>&times;</button></form><form method='dialog'><button class='btn' title='Close dialog'>Close</button></form>`
  }
}

export const showAllArticles = () => {
  favoritesSwitch.articles.forEach(article => {
    article.style.display = '';
  });
}

export const getFavsCount = () => {
  return document.querySelectorAll('article.favorite').length;
}

export const toggleButtonValues = isShowingFavorites => {
  isShowingFavorites ? favoritesSwitch.switch.title = favoritesSwitch.messages.showAll : favoritesSwitch.switch.title = favoritesSwitch.messages.showOnlyFavs;
  favoritesSwitch.switch.ariaChecked = isShowingFavorites;
}

const showNoFavsDialog = () => {
  const dialog = document.createElement('dialog');
  if (typeof dialog.showModal !== "function") {
    console.error(favoritesSwitch.messages.dialogUnsupported);
  } else {
    dialog.innerHTML = favoritesSwitch.messages.dialogContent;
    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.addEventListener('close', () => {
      dialog.remove();
    });
  }
}

const hideNonFavorites = () => {
  favoritesSwitch.articles.forEach(article => {
    if (!article.classList.contains('favorite')) {
      article.style.display = 'none';
    }
  });
}

const showHideFavorites = () => {
  // Toggle the class then evaluate the current state
  document.documentElement.classList.toggle('show-favorites');
  const isShowingFavorites = document.documentElement.classList.contains('show-favorites');

  toggleButtonValues(isShowingFavorites);
  isShowingFavorites ? hideNonFavorites() : showAllArticles();
}

export const init = () => {
  if (favoritesSwitch.switch) {
    favoritesSwitch.switch.addEventListener('click', () => {
      const favArticles = document.querySelectorAll('article.favorite');

      if (favArticles.length > 0) {
        showHideFavorites();
      } else {
        showNoFavsDialog();
      }
    });
  }
};
