interface ToastProps {
  content: string;
}

export default function Toast({ content }: ToastProps) {
  return <div className="toast">{content}</div>;
}
