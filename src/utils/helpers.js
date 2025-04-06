// helpers.js

// Updates the active menu item based on direction (wheel scroll up/down)
export const updateActiveMenuItem = (ctx, direction, menu) => {
  if (![-1, 1, 4, 8, 3, 9, 10].includes(menu)) return;
  let min = 0;
  let max = ctx.state.lengthMenuKey[menu];

  ctx.setState({
    active:
      direction === 1
        ? ctx.state.active >= max
          ? min
          : ctx.state.active + 1
        : ctx.state.active <= min
        ? max
        : ctx.state.active - 1,
  });
};

// Updates active index of the current menu with a fallback for length
export const updateActiveMenu = (ctx, direction, menu) => {
  if (![-1, 1, 4, 8, 3, 9, 10].includes(menu)) return;
  const lengthMenuKey =
    getMenuLength(menu.toString()) || ctx.state.lengthMenuKey[menu];

  ctx.setState({
    active:
      direction === 1
        ? ctx.state.active < lengthMenuKey
          ? ctx.state.active + 1
          : 0
        : ctx.state.active > 0
        ? ctx.state.active - 1
        : lengthMenuKey,
  });
};

// Moves forward through menus depending on current menu context
export const changeMenuForward = (ctx, id, fromMenu) => {
  const navStack = ctx.state.navigationStack.slice();
  if (!isValidMenu(fromMenu) && ![-2, 0, 7].includes(fromMenu)) return;

  if (fromMenu === -2) {
    // Unlock to main menu
    navStack.push(ctx.state.currentMenu);
    ctx.setState({ currentMenu: -1, navigationStack: navStack, active: 0 });
  } else if (fromMenu === -1) {
    // Move from main to submenu
    navStack.push(ctx.state.currentMenu);
    ctx.setState({ currentMenu: id, navigationStack: navStack, active: 0 });
  } else if ([0, 7].includes(fromMenu)) {
    // Toggle playback
    togglePlayPause(ctx);
  } else if (fromMenu === 8) {
    // Theme selection
    updateTheme(ctx, id);
  } else if (fromMenu === 9) {
    // Wheel color selection
    updateWheelColor(ctx, id);
  } else if (fromMenu === 10) {
    // Wallpaper selection
    updateWallpaper(ctx, id);
  } else {
    // Navigate to submenu using map
    navStack.push(ctx.state.currentMenu);
    if (fromMenu === 4) {
      chagePlayingSongFromMusicMenu(ctx, id, navStack, fromMenu);
    } else {
      const menuMappings = getMenuMapping(fromMenu.toString());
      const currentMenuID = menuMappings[id];
      if (currentMenuID !== undefined) {
        ctx.setState({
          currentMenu: currentMenuID,
          navigationStack: navStack,
          active: 0,
        });
      }
    }
  }
};

// Navigates back to the previous menu in navigation stack
export const changeMenuBackward = (ctx) => {
  const navStack = ctx.state.navigationStack.slice();
  if (ctx.state.currentMenu === -2) return; // Already at lock screen
  const prevId = navStack.pop();
  ctx.setState({ currentMenu: prevId, navigationStack: navStack, active: 0 });
};

// Toggles audio play and pause state
export const togglePlayPause = (ctx) => {
  if (ctx.state.currentMenu === -2) return;
  if (ctx.state.playing) {
    ctx.state.audio.pause();
  } else {
    ctx.state.audio.play();
  }
  ctx.setState({ playing: !ctx.state.playing });
};

// Handles seeking/forward skip in a song using wheel press gesture
export const seekSongForward = (ctx, e) => {
  if (ctx.state.currentMenu === -2 || !ctx.state.playing) return;

  if (e.detail.interval < 250) {
    // Skip to next song
    ctx.state.audio.pause();
    let idx = (ctx.state.songIndex + 1) % ctx.state.songItemsUrl.length;
    const url = ctx.state.songItemsUrl[idx];
    const img = ctx.state.songImgItemsUrl[idx];
    ctx.setState(
      { songIndex: idx, songUrl: url, songImgUrl: img, audio: new Audio(url) },
      () => {
        ctx.state.audio.play();
      }
    );
  } else if (e.detail.interval < 10000) {
    // Seek forward in current song
    ctx.setState((prev) => {
      prev.audio.currentTime += e.detail.interval / 100;
      return prev;
    });
  }
};

// Handles seeking/backward skip in a song using wheel press gesture
export const seekSongReverse = (ctx, e) => {
  if (ctx.state.currentMenu === -2 || !ctx.state.playing) return;

  if (e.detail.interval < 250) {
    // Skip to previous song
    ctx.state.audio.pause();
    let idx =
      ctx.state.songIndex === 0
        ? ctx.state.songItemsUrl.length - 1
        : ctx.state.songIndex - 1;
    const url = ctx.state.songItemsUrl[idx];
    const img = ctx.state.songImgItemsUrl[idx];
    ctx.setState(
      { songIndex: idx, songUrl: url, songImgUrl: img, audio: new Audio(url) },
      () => {
        ctx.state.audio.play();
      }
    );
  } else if (e.detail.interval < 10000) {
    // Seek backward in current song
    ctx.setState((prev) => {
      prev.audio.currentTime -= e.detail.interval / 100;
      return prev;
    });
  }
};

// Changes app theme and shows notification
export const updateTheme = (ctx, id) => {
  const themes = ["#f4f4f7", "#d3d3d3", "#e0f7fa", "#fce4ec", "#f3f0e8"];
  ctx.setState({ theme: themes[id], noty: true, notifyText: "Theme Changed" });
};

// Changes wheel color and shows notification
export const updateWheelColor = (ctx, id) => {
  const colors = ["#000000", "#ffffff", "#b2b2b2", "#007aff"];
  ctx.setState({
    wheelColor: colors[id],
    noty: true,
    notifyText: "Wheel Color Changed",
  });
};

// Changes wallpaper ID and shows notification
export const updateWallpaper = (ctx, id) => {
  ctx.setState({ wallpaper: id, noty: true, notifyText: "Wallpaper Changed" });
};

// Plays a selected song from music menu
export const chagePlayingSongFromMusicMenu = (ctx, id, navStack) => {
  const url = ctx.state.songItemsUrl[id];
  const img = ctx.state.songImgItemsUrl[id];
  ctx.state.audio.pause();

  ctx.setState(
    {
      currentMenu: 7,
      songUrl: url,
      navigationStack: navStack,
      active: 0,
      playing: true,
      songIndex: id,
      audio: new Audio(url),
      songImgUrl: img,
    },
    () => ctx.state.audio.play()
  );
};

// Resets notification flag
export const setNoty = (ctx) => {
  ctx.setState({ noty: false });
};

// Returns number of items for a given menu ID
export const getMenuLength = (menu) =>
  ({
    "-1": 3,
    1: 2,
    4: 4,
    8: 4,
    3: 2,
    9: 3,
    10: 2,
  }[menu] || 0);

// Returns menu mapping for navigating submenus
export const getMenuMapping = (menu) =>
  ({
    "-1": [0, 1, 2, 3],
    1: [4, 5, 6],
    3: [8, 9, 10],
    4: [11, 12, 13, 14],
    8: [15, 16, 17, 18],
    9: [19, 20, 21],
    10: [22, 23],
    "-2": [0],
    0: [7],
    7: [0],
  }[menu] || []);

// Checks if the given menu ID is valid
export const isValidMenu = (menu) =>
  [-1, 1, 4, 8, 3, 9, 10, -2, 0, 7].includes(menu);

// Returns current system time in 12-hour format
export const getCurrentTime = () => {
  const now = new Date();
  let hrs = now.getHours();
  let mins = now.getMinutes();
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;
  mins = mins < 10 ? "0" + mins : mins;
  return `${hrs}:${mins} ${ampm}`;
};

// Simulates battery drain when song is playing; pauses on low battery
export const simulateBatteryDrain = (ctx) => {
  if (ctx.state.playing && ctx.state.batteryLevel > 0) {
    const audio = ctx.state.audio;
    let batteryDrainAmount = 1;

    if (audio && audio.duration > 0) {
      const songProgress = audio.currentTime / audio.duration;
      batteryDrainAmount = Math.ceil(songProgress * 2);
    }

    const newBatteryLevel = Math.max(
      0,
      ctx.state.batteryLevel - batteryDrainAmount
    );

    if (newBatteryLevel <= 10 && ctx.state.playing) {
      togglePlayPause(ctx); // auto-pause
    }

    ctx.setState((prevState) => ({
      batteryLevel: newBatteryLevel,
      notifyText: newBatteryLevel <= 10 ? "Battery Low!" : prevState.notifyText,
      noty: newBatteryLevel <= 10 ? true : prevState.noty,
    }));
  }
};

// Recharges the battery to full and clears notifications
export const rechargeBattery = (ctx) => {
  ctx.setState({
    batteryLevel: 100,
    playing: true,
    noty: false,
    notifyText: "",
  });
};
