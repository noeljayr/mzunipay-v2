"use client";

import { IconPlus } from "@tabler/icons-react";
import APIKey from "@/components/APIKey";
import "@/css/apikeys.css";
import { useEffect, useState } from "react";
import TableRowLoading from "@/components/ux/TableRowLoading";
import Error from "@/components/ux/Error";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/constants";

type apiTypes = {
  api_key_id: string;
  api_key: string;
  status: string;
  created_at: string;
};

function API() {
  const [apiKeys, setApiKeys] = useState<apiTypes[]>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    const fectAPIkeys = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const response = await fetch(`${BASE_URL}/api-keys/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status == 404) {
          setNotFound(true);
          setApiKeys([]); // Clear handouts when nothing is found
        } else {
          const apiResponse = await response.json();
          const apiData: apiTypes[] = await apiResponse.apiKeys;
          console.log(apiResponse);
          setApiKeys(apiData);
          setNotFound(false);
        }
      } catch (e: any) {
        console.log(e);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fectAPIkeys();
  }, [refresh]);

  const createApiKey = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api-keys/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsError(true);
        return;
      }

      // If the response is successful, refresh the list by toggling refresh
      setRefresh((prev) => !prev);
    } catch (e: any) {
      console.error("API Key Creation Error:", e);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apis flex flex-col gap-4 w-full h-full">
      <button onClick={createApiKey} className="cta">
        <IconPlus />
        New Key
      </button>

      <div className="content-container flex flex-col gap-2">
        <h2>API Keys</h2>
        {isError ? (
          <Error />
        ) : loading ? (
          <>
            <TableRowLoading />
          </>
        ) : apiKeys ? (
          apiKeys.map((key) => {
            return (
              <APIKey
                api_key_id={key.api_key_id}
                key={key.api_key_id}
                api_key={key.api_key}
                created_at={key.created_at}
                status={key.status}
              />
            );
          })
        ) : (
          <div
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            Not found
          </div>
        )}
      </div>
    </div>
  );
}

export default API;
