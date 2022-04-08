import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function Video() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideo = useRef(null);
  const currentUserVideo = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideo.current.srcObject = mediaStream;
        currentUserVideo.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideo.current.srcObject = remoteStream;
          remoteVideo.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideo.current.srcObject = mediaStream;
      currentUserVideo.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.play();
      });
    });
  };

  return (
    <div>
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div className="d-flex flex-row">
        <div className="p-2">
            <video ref={currentUserVideo} />
        </div>
        <div className="p-2">
            <video ref={remoteVideo} />
        </div>
      </div>
      
    </div>
  );
}
