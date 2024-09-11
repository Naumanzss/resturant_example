import axios from "axios";
interface EmailData {
  date: string;
  time: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  guests: string;
}
const apiUrl = process.env.REACT_APP_API_URL;

export async function getEvents() {
  try {
    const url = `${apiUrl}/events/getAllEvents`;
    console.log("url", url);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // No need to check `resp.ok` as axios throws an error for non-2xx responses
    return response.data;
  } catch (error) {
    console.error("Error fetching client data:", error);
    // Axios error objects include a lot of information, including status code, response body, etc.
    if (axios.isAxiosError(error)) {
      // Handling Axios errors specifically
      return {
        ok: false,
        status: error.response?.status || 500,
        data: null,
        error: error.message,
      };
    } else {
      // Handling non-Axios errors (e.g., network errors)
      return {
        ok: false,
        status: 500,
        data: null,
        error: "An unknown error occurred",
      };
    }
  }
}

export async function getMenu() {
  try {
    const url = `${apiUrl}/menu/getAllMenu`;

    // Using axios to make the GET request
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // With axios, there's no need to check resp.ok; a non-2xx response will throw an error
    return response.data; // Directly return the data from the axios response
  } catch (error) {
    console.error("Error fetching menu data:", error);
    // Handling Axios errors
    if (axios.isAxiosError(error)) {
      // More detailed error handling based on axios error object
      return {
        ok: false,
        status: error.response?.status || 500,
        data: null,
        error: error.message || "An error occurred while fetching the menu",
      };
    } else {
      // Handling non-Axios errors
      return {
        ok: false,
        status: 500,
        data: null,
        error: "An unknown error occurred",
      };
    }
  }
}
export const getImageUrl = (relativePath: string | number) => {
  return `${apiUrl}/${relativePath}`;
};
export const sendReservationEmail = async (
  emailData: EmailData
): Promise<boolean> => {
  try {
    const response = await axios.post(`${apiUrl}/send/email`, emailData);
    console.log("Email sent response:", response.data);
    return true; // Assuming the email was sent successfully if no errors were thrown
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Handle the error appropriately
  }
};

export async function getReservation() {
  try {
    const url = `${apiUrl}/reservation/getReservationFull`;

    // Using axios to make the GET request
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        status: error.response?.status || 500,
        data: null,
        error: error.message || "An error occurred while fetching the menu",
      };
    } else {
      return {
        ok: false,
        status: 500,
        data: null,
        error: "An unknown error occurred",
      };
    }
  }
}
