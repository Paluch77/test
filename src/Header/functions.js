function getCurrentURL() {
    return window.location.href;
  }

  const styles = (element, styleName, type = "add") => {
    type === "remove"
      ? styleName.split(" ").forEach((elem) => {
          element.classList.remove(elem);
        })
      : styleName.split(" ").forEach((elem) => {
          element.classList.add(elem);
        });
  };



  export {getCurrentURL, styles}

