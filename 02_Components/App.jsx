import './App.css';

function Contributors() {
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  );
}

export default function Catalogue() {
  return (
    <section>
      <h1>WTF Top Contributors</h1>
      <div className="Contributors">
        <Contributors/>
        <Contributors/>
        <Contributors/>
        <Contributors/>
      </div>
    </section>
  );
}
