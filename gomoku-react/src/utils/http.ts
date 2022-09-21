import {useContext} from "react";
import {UserContext} from "../context";

export default async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const headers = response.headers
  const data = headers.get('content-type')?.includes('json')
    ? await response.json()
    : {}
  return data
}

let token = ''
export const setToken = (newToken: string) => (token = newToken)
const userId = localStorage.getItem("user._id")

export async function get<Res>(path: string): Promise<Res> {
  return await http<Res>(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      method: 'get',
    })
  )
}

export async function put<Req, Res>(path: string, body: Req): Promise<Res> {
  return await http<Res>(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'userId='+userId
      },
      body: JSON.stringify(body),
      method: 'put',
    })
  )
}

export async function post<Req, Res>(path: string, body: Req): Promise<Res> {
  return await http<Res>(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
        'Cookie': 'userId='+userId

      },
      body: JSON.stringify(body),
      method: 'post',
    })
  )
}

export async function del(path: string): Promise<undefined | null> {
  return await http<undefined | null>(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
        'Cookie': 'userId='+userId
      },
      method: 'delete',
    })
  )
}