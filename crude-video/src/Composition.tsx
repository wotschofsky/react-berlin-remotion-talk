import logo from './assets/react.svg';
import { useCurrentFrame } from './hooks';

function Composition() {
  const frame = useCurrentFrame();

  return (
    <div>
      <img
        src={logo}
        style={{
          height: '40vmin',
          transform: `rotate(${(frame / 30 / 20) * 360}deg)`,
        }}
      />
    </div>
  );
}

export default Composition;
