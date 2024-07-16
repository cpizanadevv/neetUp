import { getGroup } from "../../store/group";

const GroupDetailsPage = () => {
    const group = useSelector((state) => state.group.group);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGroup);
    }, [dispatch]);
  

}

export default GroupDetailsPage