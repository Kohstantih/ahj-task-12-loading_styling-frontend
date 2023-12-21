import CreationElements from './CreationElements';

export default class NewsWidjet {
  constructor(container) {
    this.container = container;

    this.btnRefresh = this.container.querySelector('.btn_refresh');
    this.newsList = this.container.querySelector('.news_list');
    this.preloadBox = this.container.querySelector('.preload_box');
  }

  createNewsEl(obj) {
    const news = CreationElements.createElement('li', ['news']);

    const newsTitle = CreationElements.createElement('h3', ['news-title']);
    newsTitle.textContent = obj.title;
    news.append(newsTitle);

    const preview = CreationElements.createElement('div', ['news_preview']);
    const image = CreationElements.createElement('img', ['news_image'], [
      { name: 'src', value: obj.imgSrc },
      { name: 'alt', value: 'Изображение к новости' },
    ]);
    const description = CreationElements.createElement('p', ['news_description']);
    description.textContent = obj.description;
    preview.append(image);
    preview.append(description);

    news.append(preview);

    this.newsList.append(news);
  }

  clearNewsList() {
    this.newsList.querySelectorAll('.news').forEach((n) => n.remove());
  }
}
