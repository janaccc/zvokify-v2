import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import MusicPlayer from "../MusicPlayer";

vi.mock("@/context/PlayerContext", () => ({
  usePlayer: () => ({
    currentSong: {
      id: "song-1",
      title: "Testna Pesem",
      artist: "Testni Izvajalec",
      audio_url: "https://example.com/audio.mp3",
      cover_image_url: "https://example.com/cover.jpg",
    },
  }),
}));

test("renders current song details", () => {
  render(<MusicPlayer />);

  expect(screen.getByText("Testna Pesem")).toBeInTheDocument();
  expect(screen.getByText("Testni Izvajalec")).toBeInTheDocument();
});
