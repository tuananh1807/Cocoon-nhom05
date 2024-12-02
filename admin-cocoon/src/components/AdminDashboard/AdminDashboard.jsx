import "./style.css";
import BottomBar from "./BottomBar";
import MidBar from "./MidBar";

function AdminDashboard() {
    return (
        <div className="leftmaincontainer">
            <MidBar />
            <BottomBar />
        </div>
    );
}

export default AdminDashboard;
