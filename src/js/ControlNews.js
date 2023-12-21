export default class ControlNews {
  constructor(widget, communicator, inform) {
    this.widget = widget;
    this.communicator = communicator;
    this.inform = inform;

    this.updateNewsList = this.updateNewsList.bind(this);
  }

  activation() {
    this.widget.btnRefresh.addEventListener('click', this.updateNewsList);

    setTimeout(this.updateNewsList, 3000);
  }

  updateNewsList() {
    this.widget.clearNewsList();
    this.widget.preloadBox.classList.remove('hidden');
    this.communicator.getLastNews().then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось подключиться к серверу');
    }).then((data) => {
      if (data) {
        this.widget.preloadBox.classList.add('hidden');
        data.forEach((el) => this.widget.createNewsEl(el));
      } else {
        throw new Error('Не удалось получить список новостей');
      }
    }).catch((err) => {
      console.log(err.message);
      this.inform.showInform('Не удалось загрузить данные. Проверьте подключение и обновите страницу');
    });
  }
}
