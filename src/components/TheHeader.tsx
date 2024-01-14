import Link from "next/link";
export default function Header() {
	return (
		<div className="pr-header">
			<div className="menu">
				<Link href="/">Home</Link>
				<Link href="/graphic">Graphic</Link>
			</div>
		</div>
	);
}
