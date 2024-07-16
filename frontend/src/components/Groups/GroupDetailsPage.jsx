import { getGroup } from "../../store/group";

const GroupDetailsPage = () => {
    const groups = useSelector((state) => state.groups);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGroup);
    }, [dispatch]);
  

}