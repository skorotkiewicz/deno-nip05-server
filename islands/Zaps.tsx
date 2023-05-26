import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useState } from "preact/hooks";

interface IData {
  error: boolean;
  data: string;
  success?: boolean;
  name?: string;
  pubKey?: string;
}

const Zaps = () => {
  const [name, setName] = useState<string>("");
  const [pubKey, setPubKey] = useState<string>("");
  const [data, setData] = useState<IData>();
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [available, setAvailable] = useState<boolean>(false);

  const checkName = (name: string) => {
    axiod.get(`/api?name=${name}`).then((res) => {
      setData(
        res.data.available
          ? { error: false, data: `Name "${name}" is available!` }
          : { error: true, data: "Name is taken." }
      );
      setAvailable(true);
    });
  };

  const handleSave = () => {
    if (!(name || pubKey)) return;

    axiod
      .post("/api", {
        name,
        pubKey,
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data);
          // setData({ error: false, data: res.data, success: true });
        }
        if (res.data.error) setData({ error: true, data: res.data.error });
      });
  };

  return (
    <div className="box registration-form">
      <div>
        <input
          type="text"
          value={pubKey}
          placeholder="public key"
          maxLength={64}
          onInput={(e: Event) =>
            setPubKey((e.target as HTMLInputElement).value)
          }
        />
      </div>

      <div className="address">
        <input
          type="text"
          value={name}
          placeholder="username"
          maxLength={64}
          onInput={(e: Event) => {
            const name = (e.target as HTMLInputElement).value;

            if (!name.match(/^[A-Za-z0-9]*$/)) {
              return setData({
                error: true,
                data: "Name can be only: A-Za-z0-9",
              });
            } else {
              setData({ error: false, data: "" });
            }

            setName(name);
            clearTimeout(timer);

            const newTimer = setTimeout(() => {
              checkName(name);
            }, 1000);

            setTimer(newTimer);
          }}
        />

        <label>
          <strong>@sekor.eu.org</strong>
        </label>
      </div>

      <div>
        <button onClick={handleSave} disabled={!available}>
          Save
        </button>
      </div>

      <div>
        {data && (
          <span style={{ color: data.error ? "red" : "green" }}>
            {data.data || data.error}
          </span>
        )}

        {data?.success && (
          <span>
            <p>{data.name}</p>
            <p>{data.pubKey}</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Zaps;
