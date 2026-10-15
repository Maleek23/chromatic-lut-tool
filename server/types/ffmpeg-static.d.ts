declare module "ffmpeg-static" {
  /**
   * Absolute path to the bundled ffmpeg binary. ffmpeg-static downloads the
   * correct platform binary at install time (macOS/Windows/Linux).
   */
  const ffmpegPath: string;
  export default ffmpegPath;
}
