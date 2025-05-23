
export function showMessage(
  setMessage: (msg: string) => void,
  text: string,
  duration = 3000
) {
  setMessage(text);
  setTimeout(() => setMessage(""), duration);
}
