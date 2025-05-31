import Link from "@/components/link";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-between border-border border-t pt-2 ">
      <div className="flex gap-7 px-[2px] text-muted text-small">
        <Link href="https://x.com/khushsptl" text="X " underline />
        <Link href="https://www.instagram.com/khushsptl/" text="Instagram " underline />
        <Link href="https://www.linkedin.com/in/kptls/" text="LinkedIn " underline />
      </div>
      <div className="text-muted text-small">
        <p>info@khushpatel.work</p>
      </div>
    </div>
  );
};

export { Footer };
