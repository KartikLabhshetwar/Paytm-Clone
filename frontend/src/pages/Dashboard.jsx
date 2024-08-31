import {Appbar} from "../components/Appbar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"

export function Dashboard() {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Appbar />
        <div className="max-w-4xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Balance />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users />
            </div>
          </div>
        </div>
      </div>
    );
  }