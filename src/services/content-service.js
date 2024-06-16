export  class ContentService {

  static watchHandler = null;

  static addContent(content) {
    localStorage.setItem('content', JSON.stringify([
      ...JSON.parse(localStorage.getItem('content') || '[]'),
      content,
    ]))
  }

  static getContentById(id) {
    const content = JSON.parse(localStorage.getItem('content') || '[]');
    return content.find((value) => value.id === id);
  }

  static getAllContent() {
    return JSON.parse(localStorage.getItem('content') || '[]'); 
  }

  static searchContent(search = '') {
    console.log({ search });
    const content = JSON.parse(localStorage.getItem('content') || '[]');
    if (!search) {
      return content;
    }
    const result = content.filter((value) => {
      const a = String(value.name).includes(search);
      const b = String(value.content).includes(search);
      const c = String(value.creator).includes(search);

      if (a || b || c) {
        return true;
      }

      return false;
    });

    console.log({ result });
    console.log({ watchHandler: ContentService.watchHandler });
    ContentService.watchHandler?.(result);

  }

  static watchSearch(handler) {
    ContentService.watchHandler = handler;
  }


  static addComment(postId, comment) {
    const content = ContentService.getAllContent();
    const index = content.findIndex((value) => value.id === postId);

    if (content[index]) {
      if (!content[index].comments) {
        content[index].comments = [
          {
            text: comment,
            creator: JSON.parse(localStorage.getItem('user') || '{}').username
          }
        ];
      } else {
        content[index].comments = [
          ...content[index].comments,
          {
            text: comment,
            creator: JSON.parse(localStorage.getItem('user') || '{}').username
          }
        ];
      }

      localStorage.setItem('content', JSON.stringify([
        ...content,
      ]))
    }
  }
}