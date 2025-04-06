export const updateActiveMenuItem = (ctx, direction, menu) => {
  if (![ -1, 1, 4, 8, 3, 9, 10 ].includes(menu)) return;
  let min = 0;
  let max = ctx.state.lengthMenuKey[menu];
  ctx.setState({ 
    active: direction === 1 
      ? (ctx.state.active >= max ? min : ctx.state.active + 1)
      : (ctx.state.active <= min ? max : ctx.state.active - 1)
  });
};

export const updateActiveMenu = (ctx, direction, menu) => {
  if (![ -1, 1, 4, 8, 3, 9, 10 ].includes(menu)) return;
  const lengthMenuKey = getMenuLength(menu.toString()) || ctx.state.lengthMenuKey[menu];
  if (direction === 1) {
    ctx.setState({ active: ctx.state.active < lengthMenuKey ? ctx.state.active + 1 : 0 });
  } else {
    ctx.setState({ active: ctx.state.active > 0 ? ctx.state.active - 1 : lengthMenuKey });
  }
};

export const changeMenuForward = (ctx, id, fromMenu) => {
  const navStack = ctx.state.navigationStack.slice();
  if (!isValidMenu(fromMenu) && ![-2, 0, 7].includes(fromMenu)) return;

  if (fromMenu === -2) {
    navStack.push(ctx.state.currentMenu);
    ctx.setState({ currentMenu: -1, navigationStack: navStack, active: 0 });
  } else if (fromMenu === -1) {
    navStack.push(ctx.state.currentMenu);
    ctx.setState({ currentMenu: id, navigationStack: navStack, active: 0 });
  } else if ([0, 7].includes(fromMenu)) {
    togglePlayPause(ctx);
  } else if (fromMenu === 8) {
    updateTheme(ctx, id);
  } else if (fromMenu === 9) {
    updateWheelColor(ctx, id);
  } else if (fromMenu === 10) {
    updateWallpaper(ctx, id);
  } else {
    navStack.push(ctx.state.currentMenu);
    if (fromMenu === 4) {
      chagePlayingSongFromMusicMenu(ctx, id, navStack, fromMenu);
    } else {
      const menuMappings = getMenuMapping(fromMenu.toString());
      const currentMenuID = menuMappings[id];
      if (currentMenuID !== undefined) {
        ctx.setState({ currentMenu: currentMenuID, navigationStack: navStack, active: 0 });
      }
    }
  }
};

export const changeMenuBackward = (ctx) => {
  const navStack = ctx.state.navigationStack.slice();
  if (ctx.state.currentMenu === -2) return;
  const prevId = navStack.pop();
  ctx.setState({ currentMenu: prevId, navigationStack: navStack, active: 0 });
};

export const togglePlayPause = (ctx) => {
  if (ctx.state.currentMenu === -2) return;
  if (ctx.state.playing) {
    ctx.state.audio.pause();
  } else {
    ctx.state.audio.play();
  }
  ctx.setState({ playing: !ctx.state.playing });
};

export const seekSongForward = (ctx, e) => {
  if (ctx.state.currentMenu === -2 || !ctx.state.playing) return;
  if (e.detail.interval < 250) {
    ctx.state.audio.pause();
    let idx = (ctx.state.songIndex + 1) % ctx.state.songItemsUrl.length;
    const url = ctx.state.songItemsUrl[idx];
    const img = ctx.state.songImgItemsUrl[idx];
    ctx.setState({ songIndex: idx, songUrl: url, songImgUrl: img, audio: new Audio(url) }, () => {
      ctx.state.audio.play();
    });
  } else if (e.detail.interval < 10000) {
    ctx.setState(prev => {
      prev.audio.currentTime += e.detail.interval / 100;
      return prev;
    });
  }
};

export const seekSongReverse = (ctx, e) => {
  if (ctx.state.currentMenu === -2 || !ctx.state.playing) return;
  if (e.detail.interval < 250) {
    ctx.state.audio.pause();
    let idx = ctx.state.songIndex === 0 ? ctx.state.songItemsUrl.length - 1 : ctx.state.songIndex - 1;
    const url = ctx.state.songItemsUrl[idx];
    const img = ctx.state.songImgItemsUrl[idx];
    ctx.setState({ songIndex: idx, songUrl: url, songImgUrl: img, audio: new Audio(url) }, () => {
      ctx.state.audio.play();
    });
  } else if (e.detail.interval < 10000) {
    ctx.setState(prev => {
      prev.audio.currentTime -= e.detail.interval / 100;
      return prev;
    });
  }
};

export const updateTheme = (ctx, id) => {
  const themes = ["#f0f0f0", "#555d50", "#ffcc00", "#D1CDDA", "#c4aead"];
  ctx.setState({ theme: themes[id], noty: true, notifyText: "Theme Changed" });
};

export const updateWheelColor = (ctx, id) => {
  const colors = ["#212121", "white", "#3E2723", "#3D5AFE"];
  ctx.setState({ wheelColor: colors[id], noty: true, notifyText: "Wheel Color Changed" });
};

export const updateWallpaper = (ctx, id) => {
  ctx.setState({ wallpaper: id, noty: true, notifyText: "Wallpaper Changed" });
};

export const chagePlayingSongFromMusicMenu = (ctx, id, navStack) => {
  const url = ctx.state.songItemsUrl[id];
  const img = ctx.state.songImgItemsUrl[id];
  ctx.state.audio.pause();
  ctx.setState({ 
    currentMenu: 7, songUrl: url, navigationStack: navStack, 
    active: 0, playing: true, songIndex: id, audio: new Audio(url), songImgUrl: img 
  }, () => ctx.state.audio.play());
};

export const setNoty = (ctx) => {
  ctx.setState({ noty: false });
};

// Export other helpers
export const getMenuLength = (menu) => ({
  "-1": 3, "1": 2, "4": 4, "8": 4, "3": 2, "9": 3, "10": 2
})[menu] || 0;

export const getMenuMapping = (menu) => ({
  "-1": [0, 1, 2, 3], "1": [4, 5, 6], "3": [8, 9, 10],
  "4": [11, 12, 13, 14], "8": [15, 16, 17, 18],
  "9": [19, 20, 21], "10": [22, 23], "-2": [0], "0": [7], "7": [0]
})[menu] || [];

export const isValidMenu = (menu) => [ -1, 1, 4, 8, 3, 9, 10, -2, 0, 7 ].includes(menu);

export const getCurrentTime = () => {
  const now = new Date();
  let hrs = now.getHours();
  let mins = now.getMinutes();
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12 || 12;
  mins = mins < 10 ? '0' + mins : mins;
  return `${hrs}:${mins} ${ampm}`;
};
