"use client";

import { IconPlus } from "@tabler/icons-react";
import APIKey from "@/components/APIKey";
import { apiKeys } from "@/constants/apiKeys";
import "@/css/apikeys.css";

type apiTypes = {
  api_key: string;
  status: string;
  created_at: string;
};

function API() {
  return (
    <div className="apis flex flex-col gap-4 w-full h-full">
      <button onClick={() => {}} className="cta">
        <IconPlus />
        New Key
      </button>

      <div className="content-container flex flex-col gap-2">
        <h2>API Keys</h2>
        {apiKeys.map((key) => {
          return (
            <APIKey
              key={key.api_key_id}
              api_key={key.api_key}
              created_at={key.created_at}
              status={key.status}
            />
          );
        })}
      </div>
    </div>
  );
}

export default API;
